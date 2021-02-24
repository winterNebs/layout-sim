"use strict";
class Layout {
    constructor(name, width, keymap) {
        this.name = "default layout";
        this.width = 12;
        this.name = name;
        this.keymap = keymap;
        this.width = width;
    }
    static fromString(name, width, keymap) {
        return new Layout(name, width, keymap.split(""));
    }
    static translate(text, source, dest) {
        let translated = "";
        for (let i of text) {
            translated += source.keymap[dest.keymap.indexOf(i.toLowerCase())];
        }
        return translated;
    }
}
let layouts = [
    Layout.fromString("qwerty", 12, "qwertyuiop[]asdfghjkl;'\nzxcvbnm,./~~ "),
    Layout.fromString("workman", 12, "qdrwbjfup;[]ashtgyneoi'\nzxmcvkl,./~~ "),
    Layout.fromString("colemak dh", 12, "qwfpbjluy;[]arstgmneio'\nzxcdvkh,./~~ "),
    Layout.fromString("dvorak", 12, "',.pyfgcrl/=aoeuidhtns-\n;qjkxbmwvz~~ "),
    Layout.fromString("arensito", 12, "ql~p~~fudk~~arenbgsito~~zw~hjvcymx~~ "),
];
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const test = document.querySelector("#test");
const start = document.querySelector("#start");
const source = document.querySelector("#source");
const dest = document.querySelector("#dest");
for (let l of layouts) {
    let opt = document.createElement("option");
    let opt1 = document.createElement("option");
    opt.text = l.name;
    opt1.text = l.name;
    source.add(opt);
    dest.add(opt1);
}
start.onclick = () => {
    output.value = Layout.translate(input.value, layouts.find((l) => l.name == source.value) || layouts[0], layouts.find((l) => l.name == dest.value) || layouts[0]);
    test.value = "";
};
