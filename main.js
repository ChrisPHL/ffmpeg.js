
const ffmpeg = require('./ffmpeg-mp4');

if (window) {
  window.ffmpeg = ffmpeg;
  global.process = {
    stdout: {
      write: function (msg) {
      // ffmpeg gibt häufig reine Strings ohne Zeilenumbruch
        console.log('[ffmpeg stdout]', msg);
      }
    },
    stderr: {
      write: function (msg) {
        console.error('[ffmpeg stderr]', msg);
      }
    },
    // optional – manche Module prüfen env.VAR
    env: {}
  };
}


let stdout = "";
let stderr = "";
// Print FFmpeg's version.
ffmpeg({
  arguments: ["-version"],
  print: function(data) { stdout += data + "\n"; },
  printErr: function(data) { stderr += data + "\n"; },
  onExit: function(code) {
    console.log("Process exited with code " + code);
    console.log(stdout);
    console.log(stderr);
  },
});

