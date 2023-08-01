const _0x3961 = [
    'join',
    '36603nocPXm',
    '23egQKVe',
    '190613QbtKgi',
    'path',
    '1297622DqFdYM',
    'stringify',
    'nspector-c',
    'utf-8',
    '../cocos-i',
    'parse',
    '374901sDHROF',
    'readFileSy',
    'existsSync',
    '1aniGiv',
    'dZNJu',
    '2514851pBICqJ',
    'config.jso',
    'ync',
    '6031qwzsGQ',
    'saveConfig',
    'eKgFl',
    'writeFileS',
    'onfig.json',
    '109KUqREV',
    '1326899MeBktt',
    'readConfig',
    '2idFQZv',
    '2towqYq'
];
function _0x515a(_0x46f033, _0x59605f) {
    _0x46f033 = _0x46f033 - (0x117 * -0x18 + -0x116e * -0x2 + -0x83b);
    let _0x2deafc = _0x3961[_0x46f033];
    return _0x2deafc;
}
const _0x5c7c74 = _0x515a;
(function (_0x221f3b, _0x157ae4) {
    const _0x12547f = _0x515a;
    while (!![]) {
        try {
            const _0x56773b = parseInt(_0x12547f(0x91)) + parseInt(_0x12547f(0x82)) * -parseInt(_0x12547f(0x94)) + -parseInt(_0x12547f(0x8b)) + parseInt(_0x12547f(0x81)) * -parseInt(_0x12547f(0x7c)) + parseInt(_0x12547f(0x87)) * -parseInt(_0x12547f(0x88)) + parseInt(_0x12547f(0x89)) * -parseInt(_0x12547f(0x84)) + -parseInt(_0x12547f(0x79)) * -parseInt(_0x12547f(0x85));
            if (_0x56773b === _0x157ae4)
                break;
            else
                _0x221f3b['push'](_0x221f3b['shift']());
        } catch (_0x37b402) {
            _0x221f3b['push'](_0x221f3b['shift']());
        }
    }
}(_0x3961, -0x195d61 + -0x14c * -0xbc1 + 0x17d92d));
let fs = require('fs'), path = require(_0x5c7c74(0x8a)), _configPath = path[_0x5c7c74(0x86)](__dirname, _0x5c7c74(0x7a) + 'n'), __parentConfig = path[_0x5c7c74(0x86)](__dirname, _0x5c7c74(0x8f) + _0x5c7c74(0x8d) + _0x5c7c74(0x80));
global[_0x5c7c74(0x83)] = () => {
    const _0x355e37 = _0x5c7c74, _0x52ebba = { 'dZNJu': _0x355e37(0x8e) };
    let _0x2c2463 = '';
    return fs[_0x355e37(0x93)](__parentConfig) ? _0x2c2463 = fs[_0x355e37(0x92) + 'nc'](__parentConfig, { 'encoding': _0x52ebba[_0x355e37(0x95)] }) : _0x2c2463 = fs[_0x355e37(0x92) + 'nc'](_configPath, { 'encoding': _0x52ebba[_0x355e37(0x95)] }), JSON[_0x355e37(0x90)](_0x2c2463);
}, global[_0x5c7c74(0x7d)] = _0x47dbf8 => {
    const _0x54c561 = _0x5c7c74, _0x1248c5 = { 'eKgFl': _0x54c561(0x8e) };
    let _0x5364c2 = JSON[_0x54c561(0x8c)](_0x47dbf8);
    fs[_0x54c561(0x7f) + _0x54c561(0x7b)](__parentConfig, _0x5364c2, { 'encoding': _0x1248c5[_0x54c561(0x7e)] });
};