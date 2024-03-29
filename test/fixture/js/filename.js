module.exports['empty.http'] = [
];

module.exports['generic.http'] = [{
  type: 'file',
  name: 'upload',
  filename: '',
  fixture: 'plain.txt',
  sha1: 'b31d07bac24ac32734de88b3687dddb10e976872'
}]

module.exports['filename-name.http'] = [{
  type: 'file',
  name: 'upload',
  filename: 'plain.txt',
  fixture: 'plain.txt',
  sha1: 'b31d07bac24ac32734de88b3687dddb10e976872'
}]

module.exports['quotes.http'] = [{
  type: 'file',
  name: 'upload',
  filename: 'foo "bar"',
  fixture: 'plain.txt',
  sha1: 'b31d07bac24ac32734de88b3687dddb10e976872'
}]

module.exports['unquoted.http'] = [{
  type: 'file',
  name: 'upload',
  filename: 'foo_bar.txt',
  fixture: 'plain.txt',
  sha1: 'b31d07bac24ac32734de88b3687dddb10e976872'
}]
