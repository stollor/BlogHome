'use strict';
const _0x1016 = [
    'OpenDevToo',
    'exports',
    'error',
    'usONy',
    'cuFGP',
    'v.switchMo',
    'ready-to-s',
    'setting.co',
    '1RlWFRR',
    'YymJj',
    'name',
    'has\x20tray\x20a',
    'electron',
    ':focusNode',
    'dxBop',
    'size',
    '59581sxuRPa',
    'isteners',
    'existsSync',
    'MROLJ',
    'setting.to',
    'getContent',
    'mainPreloa',
    'PgtEU',
    'json',
    'rWGJB',
    'd.js',
    '36529FbCjCN',
    'server',
    'closed',
    'show',
    'NRJKk',
    ':savePrefa',
    'User',
    'file://',
    'Path',
    'removeAllL',
    'tml',
    'loadURL',
    'pqgDj',
    'split',
    'tjGaI',
    'NYLzX',
    'de(',
    'version',
    'getData',
    'aScript',
    'DvOeX',
    'i\x20Mode',
    'XdrYS',
    'getSelecte',
    'nges',
    'Message',
    'kkGBB',
    'TiNoI',
    'asset',
    ':focusAsse',
    'CYfWH',
    'onfig.json',
    'EdHEQ',
    'join',
    '3WraZku',
    'ggleSimple',
    '21674KRdduS',
    'ch-asset',
    'mITdB',
    'versions',
    'Selection',
    'kWePZ',
    'nfigDataFo',
    './package.',
    'query-port',
    'append',
    'qVZOP',
    'Mode()',
    'sOxXm',
    'destroy',
    'process',
    '328213nCLuYb',
    'electron.h',
    'unselect',
    'sVIdM',
    '473653Fhihtx',
    'ui-kit:tou',
    'simpleMode',
    'ector\x20v',
    'click',
    'setImage',
    'rLQsp',
    'save-prefa',
    '#2e2c29',
    'execute-sc',
    './icon.png',
    'pziDp',
    'index_low_',
    '&mode=',
    '134UkehUh',
    'path',
    'owXhI',
    'v?.refresh',
    'Toggle\x20Min',
    'Sec',
    'Menu',
    'ene-script',
    'nspector-c',
    '1682SkLfkU',
    'rZHmi',
    'Cocos\x20Insp',
    'readFileSy',
    'Visibility',
    'fixed\x20cont',
    'UPpQU',
    'ZRgHO',
    'scene',
    'index.html',
    'setContext',
    'node',
    'AwrSH',
    'Size',
    '../cocos-i',
    'openDevToo',
    'setContent',
    'select',
    'getUserTok',
    'lDXwP',
    'NDeAA',
    'parse',
    'ent\x20size',
    'setMenuBar',
    'executeJav',
    'then',
    'warn',
    'lready!',
    'webContent',
    'xhlBn',
    'disableWeb',
    'jjvTf',
    'assign',
    '4wXgmTd',
    'rMain',
    'b-from-cha',
    'UBSzJ',
    '13mJjhXV',
    'pAyUY',
    'isPortrait',
    'config.jso',
    'how',
    'qarjr',
    'createFrom',
    'request',
    'resize',
    'eQKWR',
    '613843BNlchF',
    'utf-8',
    'broadcast',
    '?port=',
    'setMenu',
    'access_tok'
];
function _0x99ae(_0xd8bdf5, _0x26221e) {
    _0xd8bdf5 = _0xd8bdf5 - (-0x1f84 + 0xcda + 0x13ea);
    let _0x4b7499 = _0x1016[_0xd8bdf5];
    return _0x4b7499;
}
const _0x46a7fd = _0x99ae;
(function (_0x317764, _0x2d59d5) {
    const _0x30afc5 = _0x99ae;
    while (!![]) {
        try {
            const _0x2a1066 = -parseInt(_0x30afc5(0x18d)) * parseInt(_0x30afc5(0x147)) + parseInt(_0x30afc5(0x17c)) * parseInt(_0x30afc5(0x14f)) + -parseInt(_0x30afc5(0x191)) + parseInt(_0x30afc5(0x19f)) * parseInt(_0x30afc5(0x1a8)) + parseInt(_0x30afc5(0x1d7)) + parseInt(_0x30afc5(0x1cd)) * parseInt(_0x30afc5(0x17e)) + -parseInt(_0x30afc5(0x1c9)) * parseInt(_0x30afc5(0x15a));
            if (_0x2a1066 === _0x2d59d5)
                break;
            else
                _0x317764['push'](_0x317764['shift']());
        } catch (_0x477ce3) {
            _0x317764['push'](_0x317764['shift']());
        }
    }
}(_0x1016, -0x1e * -0x3956 + -0x4b1 * -0xc2 + -0x4e82c));
const {BrowserWindow, app, remote, ipcMain, Menu, Tray, nativeImage, MenuItem} = require(_0x46a7fd(0x14b)), path = require(_0x46a7fd(0x1a0)), pcs = require(_0x46a7fd(0x18c)), os = require('os'), folder = '', devTools = ![];
let win, tray = null, mode = 0x1 * 0xc8a + -0x1eb * 0x2 + 0x4 * -0x22d, unloaded = ![];
const PKG_NAME = require(_0x46a7fd(0x185) + _0x46a7fd(0x157))[_0x46a7fd(0x149)], PKG_VERSION = require(_0x46a7fd(0x185) + _0x46a7fd(0x157))[_0x46a7fd(0x16b)];
let fs = require('fs'), _configPath = path[_0x46a7fd(0x17b)](__dirname, _0x46a7fd(0x1d0) + 'n'), __parentConfig = path[_0x46a7fd(0x17b)](__dirname, _0x46a7fd(0x1b6) + _0x46a7fd(0x1a7) + _0x46a7fd(0x179));
function readConfig() {
    const _0x202856 = _0x46a7fd, _0x25942e = { 'owXhI': _0x202856(0x1d8) };
    let _0x534fe2 = '';
    return fs[_0x202856(0x151)](__parentConfig) ? _0x534fe2 = fs[_0x202856(0x1ab) + 'nc'](__parentConfig, { 'encoding': _0x25942e[_0x202856(0x1a1)] }) : _0x534fe2 = fs[_0x202856(0x1ab) + 'nc'](_configPath, { 'encoding': _0x25942e[_0x202856(0x1a1)] }), JSON[_0x202856(0x1bd)](_0x534fe2);
}
let config = readConfig(), disableWebSec = Boolean(config[_0x46a7fd(0x1c6) + _0x46a7fd(0x1a4)]), dw = -0x7d9 + 0x1 * -0x705 + -0x15a * -0xb, dh = -0xc46 + 0x1ade + -0x2 * 0x74c;
function changeDWH() {
    const _0x52c4e5 = _0x46a7fd, _0x5b9a64 = {
            'ZRgHO': function (_0x15a6ea, _0x4f8020) {
                return _0x15a6ea + _0x4f8020;
            }
        };
    dw = config[_0x52c4e5(0x193)] ? config[_0x52c4e5(0x1cf)] ? config[_0x52c4e5(0x14e)][-0x7b + 0x1c5a + 0x5 * -0x593] : config[_0x52c4e5(0x14e)][-0x12d + -0x4 * -0x655 + -0x1826] : 0x1ac2 + -0xc8c * -0x2 + -0x306c, dh = config[_0x52c4e5(0x193)] ? _0x5b9a64[_0x52c4e5(0x1af)](config[_0x52c4e5(0x1cf)] ? config[_0x52c4e5(0x14e)][-0x797 * -0x4 + 0x20c5 + -0x650 * 0xa] : config[_0x52c4e5(0x14e)][-0x4b9 * -0x5 + 0x4 * 0x780 + -0x359d], -0x9f9 + -0x1704 + 0x3b * 0x90) : -0x280 + 0x1 * -0xbe1 + 0x10b9;
}
changeDWH();
let u = null;
module[_0x46a7fd(0x140)] = {
    async 'load'() {
        const _0x2e20c3 = _0x46a7fd;
        ipcMain['on'](PKG_NAME + (_0x2e20c3(0x15f) + 'b'), savePrefab), ipcMain['on'](PKG_NAME + _0x2e20c3(0x14c), focusNode), ipcMain['on'](PKG_NAME + (_0x2e20c3(0x177) + 't'), focusAsset);
        try {
            u = await Editor[_0x2e20c3(0x160)][_0x2e20c3(0x16c)]();
            if (!u[_0x2e20c3(0x1dc) + 'en'])
                Object[_0x2e20c3(0x1c8)](u, await Editor[_0x2e20c3(0x160)][_0x2e20c3(0x1ba) + 'en']());
        } catch (_0x14a0ef) {
        }
    },
    'unload'() {
        const _0x14d65f = _0x46a7fd;
        unloaded = !![], ipcMain[_0x14d65f(0x163) + _0x14d65f(0x150)](PKG_NAME + (_0x14d65f(0x15f) + 'b')), ipcMain[_0x14d65f(0x163) + _0x14d65f(0x150)](PKG_NAME + _0x14d65f(0x14c)), ipcMain[_0x14d65f(0x163) + _0x14d65f(0x150)](PKG_NAME + (_0x14d65f(0x177) + 't'));
    },
    'methods': {
        'previewMode'() {
            const _0x4f9211 = _0x46a7fd, _0x2d0e9d = {
                    'jjvTf': function (_0x19b4f5, _0x1df074) {
                        return _0x19b4f5(_0x1df074);
                    }
                };
            if (unloaded)
                return;
            _0x2d0e9d[_0x4f9211(0x1c7)](tryShowWindow, 0xef * -0x2 + 0x1 * 0x837 + -0x5 * 0x145);
        },
        'buildMobileMode'() {
            const _0xfddff8 = _0x46a7fd, _0x14f96e = {
                    'usONy': function (_0x241c87, _0x226811) {
                        return _0x241c87(_0x226811);
                    }
                };
            if (unloaded)
                return;
            _0x14f96e[_0xfddff8(0x142)](tryShowWindow, -0x1064 + 0x1ba2 + -0xb3d);
        },
        'buildDesktopMode'() {
            const _0x126bb8 = _0x46a7fd, _0x447304 = {
                    'AwrSH': function (_0x1676a1, _0x24b244) {
                        return _0x1676a1(_0x24b244);
                    }
                };
            if (unloaded)
                return;
            _0x447304[_0x126bb8(0x1b4)](tryShowWindow, 0xf * 0x225 + -0x4 * 0x439 + -0xf44);
        },
        'openCustomPage'() {
            const _0x12ec6d = _0x46a7fd, _0x195b9a = {
                    'rLQsp': function (_0x3e1895, _0x493644) {
                        return _0x3e1895(_0x493644);
                    }
                };
            if (unloaded)
                return;
            _0x195b9a[_0x12ec6d(0x197)](tryShowWindow, -0x1fb5 + -0x56 * -0x64 + -0x1e1);
        },
        'refresh'() {
            const _0x50c4f1 = _0x46a7fd, _0x5dcbf6 = { 'CYfWH': _0x50c4f1(0x1a2) + '()' };
            win?.[_0x50c4f1(0x1c4) + 's']?.[_0x50c4f1(0x1c0) + _0x50c4f1(0x16d)](_0x5dcbf6[_0x50c4f1(0x178)]);
        }
    }
};
function savePrefab(_0x4eb1a4, _0x59faa2) {
    const _0x224878 = _0x46a7fd, _0x1f0711 = {
            'pziDp': _0x224878(0x1b0),
            'MROLJ': _0x224878(0x19a) + _0x224878(0x1a6),
            'rWGJB': _0x224878(0x198) + _0x224878(0x1cb) + _0x224878(0x172)
        };
    Editor[_0x224878(0x173)][_0x224878(0x1d4)](_0x1f0711[_0x224878(0x19c)], _0x1f0711[_0x224878(0x152)], {
        'name': PKG_NAME,
        'method': _0x1f0711[_0x224878(0x158)],
        'args': [_0x59faa2]
    });
}
function focusNode(_0x4e6cd3, _0x3acca2) {
    const _0x53944f = _0x46a7fd, _0x4de022 = { 'DvOeX': _0x53944f(0x1b3) };
    let _0x49fd9d = Editor[_0x53944f(0x182)][_0x53944f(0x171) + 'd'](_0x4de022[_0x53944f(0x16e)]);
    Editor[_0x53944f(0x182)][_0x53944f(0x18f)](_0x4de022[_0x53944f(0x16e)], _0x49fd9d), Editor[_0x53944f(0x182)][_0x53944f(0x1b9)](_0x4de022[_0x53944f(0x16e)], _0x3acca2);
}
function focusAsset(_0x3db6a9, _0x3d9a95) {
    const _0x3abe31 = _0x46a7fd, _0x31a259 = {
            'dxBop': _0x3abe31(0x192) + _0x3abe31(0x17f),
            'xhlBn': _0x3abe31(0x176)
        };
    Editor[_0x3abe31(0x173)][_0x3abe31(0x1d9)](_0x31a259[_0x3abe31(0x14d)], _0x3d9a95);
    let _0x34a1d2 = Editor[_0x3abe31(0x182)][_0x3abe31(0x171) + 'd'](_0x31a259[_0x3abe31(0x1c5)]);
    Editor[_0x3abe31(0x182)][_0x3abe31(0x18f)](_0x31a259[_0x3abe31(0x1c5)], _0x34a1d2), Editor[_0x3abe31(0x182)][_0x3abe31(0x1b9)](_0x31a259[_0x3abe31(0x1c5)], _0x3d9a95);
}
async function showWindow() {
    const _0x1ba37b = _0x46a7fd, _0x5c6801 = {
            'pqgDj': function (_0xf12c84) {
                return _0xf12c84();
            },
            'UPpQU': function (_0x1eb81c, _0x256d1a) {
                return _0x1eb81c != _0x256d1a;
            },
            'cuFGP': _0x1ba37b(0x1ad) + _0x1ba37b(0x1be),
            'UBSzJ': _0x1ba37b(0x146) + _0x1ba37b(0x184) + _0x1ba37b(0x1ca),
            'kWePZ': function (_0x251b7b, _0x47ea6c) {
                return _0x251b7b + _0x47ea6c;
            },
            'sOxXm': _0x1ba37b(0x1aa) + _0x1ba37b(0x194),
            'YymJj': _0x1ba37b(0x199),
            'pAyUY': _0x1ba37b(0x1d5),
            'sVIdM': _0x1ba37b(0x145) + _0x1ba37b(0x1d1),
            'tjGaI': _0x1ba37b(0x15c),
            'TiNoI': function (_0x5c21, _0x330cc5) {
                return _0x5c21 >= _0x330cc5;
            },
            'mITdB': _0x1ba37b(0x15b),
            'NDeAA': _0x1ba37b(0x186),
            'NRJKk': _0x1ba37b(0x1da),
            'lDXwP': _0x1ba37b(0x19e)
        };
    if (win) {
        win[_0x1ba37b(0x15d)](), win[_0x1ba37b(0x1c4) + 's'][_0x1ba37b(0x1c0) + _0x1ba37b(0x16d)](_0x1ba37b(0x144) + _0x1ba37b(0x16a) + mode + ')');
        return;
    }
    win = new BrowserWindow({
        'width': dw,
        'height': dh,
        'title': _0x5c6801[_0x1ba37b(0x183)](_0x5c6801[_0x1ba37b(0x18a)], PKG_VERSION),
        'backgroundColor': _0x5c6801[_0x1ba37b(0x148)],
        'autoHideMenuBar': !![],
        'webPreferences': {
            'useContentSize': !![],
            'enablePreferredSizeMode': ![],
            'preferredSizeMode': ![],
            'webviewTag': !![],
            'nodeIntegration': !![],
            'nodeIntegrationInSubFrames': !![],
            'enableRemoteModule': !![],
            'sandbox': ![],
            'devTools': devTools,
            'contextIsolation': ![],
            'webSecurity': !disableWebSec,
            'resizable': !config[_0x1ba37b(0x193)],
            'minimizable': !config[_0x1ba37b(0x193)],
            'maximizable': !config[_0x1ba37b(0x193)],
            'preload': path[_0x1ba37b(0x17b)](__dirname, folder + (_0x1ba37b(0x155) + _0x1ba37b(0x159)))
        }
    });
    try {
        win[_0x1ba37b(0x1db)](null), win[_0x1ba37b(0x1bf) + _0x1ba37b(0x1ac)](![]), win[_0x1ba37b(0x1bf) + _0x1ba37b(0x1ac)] = win[_0x1ba37b(0x1db)] = function (_0x1d0e3c) {
        };
    } catch (_0x38fa) {
    }
    win['on'](_0x5c6801[_0x1ba37b(0x1ce)], () => {
        const _0x5de536 = _0x1ba37b, _0x262bd2 = {
                'NYLzX': function (_0x1ac330) {
                    const _0xe52e48 = _0x99ae;
                    return _0x5c6801[_0xe52e48(0x166)](_0x1ac330);
                },
                'XdrYS': function (_0x190815, _0x558b97) {
                    const _0x359588 = _0x99ae;
                    return _0x5c6801[_0x359588(0x1ae)](_0x190815, _0x558b97);
                },
                'qarjr': _0x5c6801[_0x5de536(0x143)]
            };
        try {
            win[_0x5de536(0x1c4) + 's'][_0x5de536(0x1c0) + _0x5de536(0x16d)](_0x5c6801[_0x5de536(0x1cc)])[_0x5de536(0x1c1)](function (_0x2b298d) {
                const _0x3f9390 = _0x5de536;
                if (_0x2b298d)
                    config = _0x2b298d;
                _0x262bd2[_0x3f9390(0x169)](changeDWH);
                if (config[_0x3f9390(0x193)] && win[_0x3f9390(0x1c4) + 's']) {
                    let _0x496aba = win[_0x3f9390(0x154) + _0x3f9390(0x1b5)]();
                    (_0x262bd2[_0x3f9390(0x170)](dw, _0x496aba[0x2505 + -0x1781 + -0xd84]), _0x262bd2[_0x3f9390(0x170)](dh, _0x496aba[-0x61f * 0x3 + 0xb * 0x101 + 0x753])) && (win[_0x3f9390(0x1b8) + _0x3f9390(0x1b5)](dw, dh), devTools && console[_0x3f9390(0x1c2)](_0x262bd2[_0x3f9390(0x1d2)]));
                }
            });
        } catch (_0x42d46b) {
            console[_0x5de536(0x141)](_0x42d46b);
        }
    }), win['on'](_0x5c6801[_0x1ba37b(0x190)], () => win[_0x1ba37b(0x15d)]()), win['on'](_0x5c6801[_0x1ba37b(0x168)], () => {
        const _0x1e78b1 = _0x1ba37b;
        win[_0x1e78b1(0x18b)](), win = null;
        if (tray)
            tray[_0x1e78b1(0x18b)]();
        tray = null;
    });
    let _0x50962c = folder + (_0x1ba37b(0x19d) + _0x1ba37b(0x18e) + _0x1ba37b(0x164));
    _0x5c6801[_0x1ba37b(0x175)](process[_0x1ba37b(0x181)][_0x1ba37b(0x14b)][_0x1ba37b(0x167)]('.')[-0x2081 * -0x1 + 0x23b8 + -0x4439], 0x32 * -0xbd + 0x26f * 0x1 + 0x170 * 0x18) && (_0x50962c = folder + _0x1ba37b(0x1b1));
    let _0x4e434e = await Editor[_0x1ba37b(0x173)][_0x1ba37b(0x1d4)](_0x5c6801[_0x1ba37b(0x180)], _0x5c6801[_0x1ba37b(0x1bc)]), _0x316018 = path[_0x1ba37b(0x17b)](__dirname, _0x5c6801[_0x1ba37b(0x183)](_0x5c6801[_0x1ba37b(0x183)](_0x5c6801[_0x1ba37b(0x183)](_0x5c6801[_0x1ba37b(0x183)](_0x50962c, _0x5c6801[_0x1ba37b(0x15e)]), _0x4e434e), _0x5c6801[_0x1ba37b(0x1bb)]), mode));
    if (u) {
        let {
                cocos_uid: _0xbece0b,
                nickname: _0x5a5b8b,
                access_token: _0x5d7cbf
            } = u, _0x17cff9 = {
                'cocos_uid': _0xbece0b,
                'nickname': _0x5a5b8b,
                'access_token': _0x5d7cbf
            };
        for (let _0x5e19e8 in _0x17cff9) {
            _0x316018 += '&' + _0x5e19e8 + '=' + _0x17cff9[_0x5e19e8];
        }
    }
    win[_0x1ba37b(0x165)](_0x1ba37b(0x161) + _0x316018);
}
function tryShowWindow(_0x38e9ea) {
    const _0xeadb5e = _0x46a7fd, _0x159eef = {
            'qVZOP': _0xeadb5e(0x19b),
            'PgtEU': _0xeadb5e(0x195),
            'rZHmi': _0xeadb5e(0x1a3) + _0xeadb5e(0x16f),
            'kkGBB': _0xeadb5e(0x1dd) + 'ls',
            'eQKWR': _0xeadb5e(0x14a) + _0xeadb5e(0x1c3),
            'EdHEQ': function (_0x54acd1) {
                return _0x54acd1();
            }
        };
    try {
        let _0x5e7d4e = nativeImage[_0xeadb5e(0x1d3) + _0xeadb5e(0x162)](path[_0xeadb5e(0x17b)](__dirname, _0x159eef[_0xeadb5e(0x188)]));
        _0x5e7d4e = _0x5e7d4e[_0xeadb5e(0x1d5)]({
            'width': 0x10,
            'height': 0x10
        });
        tray && tray[_0xeadb5e(0x196)](_0x5e7d4e);
        if (!tray) {
            tray = new Tray(_0x5e7d4e), tray['on'](_0x159eef[_0xeadb5e(0x156)], function () {
                const _0x5a0c1e = _0xeadb5e;
                win[_0x5a0c1e(0x15d)]();
            });
            let _0x57e2bc = new Menu();
            _0x57e2bc[_0xeadb5e(0x187)](new MenuItem({
                'label': _0x159eef[_0xeadb5e(0x1a9)],
                'click': function () {
                    const _0x4d7a9d = _0xeadb5e;
                    win && win[_0x4d7a9d(0x1c4) + 's'][_0x4d7a9d(0x1c0) + _0x4d7a9d(0x16d)](_0x4d7a9d(0x153) + _0x4d7a9d(0x17d) + _0x4d7a9d(0x189));
                }
            })), devTools && _0x57e2bc[_0xeadb5e(0x187)](new MenuItem({
                'label': _0x159eef[_0xeadb5e(0x174)],
                'click': function () {
                    const _0x5a660b = _0xeadb5e;
                    win && win[_0x5a660b(0x1c4) + 's'][_0x5a660b(0x1b7) + 'ls']();
                }
            })), tray[_0xeadb5e(0x1b2) + _0xeadb5e(0x1a5)](_0x57e2bc);
        } else {
            if (devTools)
                console[_0xeadb5e(0x1c2)](_0x159eef[_0xeadb5e(0x1d6)]);
        }
    } catch (_0x48b79e) {
        if (devTools)
            console[_0xeadb5e(0x141)](_0x48b79e);
    }
    mode = _0x38e9ea;
    try {
        _0x159eef[_0xeadb5e(0x17a)](showWindow);
    } catch (_0x4efb99) {
        console[_0xeadb5e(0x141)](_0x4efb99);
    }
}