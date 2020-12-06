require('malta').checkExec('parcel');

const path = require('path'),
    child_process = require('child_process');
    
let ls = null;
function startParcel(opts) {
    ls = child_process.spawn('parcel', opts);
}

function malta_parcel(o, options) {
    options = options || {}
    const self = this,
		start = new Date(),
        port = 'port' in options ? `${options.port}` : "1234",
		opts = [o.name, '-p', port],
        pluginName = path.basename(path.dirname(__filename));
    let msg;
	return (solve, reject) => {
		try {
            let pre = ''
            if (ls) {
                ls.kill('SIGINT');
                pre = 're'; 
            }
            startParcel(opts);
            msg = `plugin ${pluginName.white()} ${pre}started from ${o.name} on http://localhost:${port}`;

            ls.on('exit', code => {
                msg = 'plugin ' + pluginName.white() + ' done';
                solve(o);
                self.notifyAndUnlock(start, msg);
            });
            ls.on('error', err =>  {
                msg = 'plugin ' + pluginName.white() + ' failed'.red();
                self.doErr(err, o, pluginName);
                err
                    ? reject(`Plugin ${pluginName} error:\n${err}`)
                    : solve(o);
                self.notifyAndUnlock(start, msg);
            });
            solve(o);
            self.notifyAndUnlock(start, msg);
            
		} catch (err) {
			self.doErr(err, o, pluginName);
		}
	};
}
malta_parcel.ext = ['html', 'md', 'pug'];
module.exports = malta_parcel;