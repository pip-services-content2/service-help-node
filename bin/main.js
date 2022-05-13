let HelpProcess = require('../obj/src/container/HelpProcess').HelpProcess;

try {
    new HelpProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
