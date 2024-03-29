var properFilename = 'funkyfilename.txt';

function expect(filename) {
  return [
    {
      type: 'field',
      name: 'title',
      value: 'Weird filename'
    },
    {
      type: 'file',
      name: 'upload',
      filename: filename,
      fixture: properFilename
    }
  ];
}

var webkit = " ? % * | \" < > . ? ; ' @ # $ ^ & ( ) - _ = + { } [ ] ` ~.txt";
var ffOrIe = " ? % * | \" < > . ☃ ; ' @ # $ ^ & ( ) - _ = + { } [ ] ` ~.txt";

module.exports = {
  'issue-252-chrome.http' : [
    {
      type: 'field',
      name: 'title',
      value: 'Weird filename'
    },
    {
      type: 'file',
      name: 'upload',
      filename: 'JΛ̊KE_2023-02-25T16:44:24.129Z.txt'
    }
  ],
  'osx-chrome-13.http'   : expect(webkit),
  'osx-firefox-3.6.http' : expect(ffOrIe),
  'osx-safari-5.http'    : expect(webkit),
  'xp-chrome-12.http'    : expect(webkit),
  'xp-ie-7.http'         : expect(ffOrIe),
  'xp-ie-8.http'         : expect(ffOrIe),
  'xp-safari-5.http'     : expect(webkit)
};
