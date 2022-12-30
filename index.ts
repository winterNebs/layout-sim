class Layout {
  // just focus on alphas for now:
  public keymap: string[];
  public name: string = "default layout";
  public width: number = 12;

  public constructor(name: string, width: number, keymap: string[]) {
    this.name = name;
    this.keymap = keymap;
    this.width = width;
  }
  public static fromString(
    name: string,
    width: number,
    keymap: string
  ): Layout {
    return new Layout(name, width, keymap.split(""));
  }

  public static translate(text: string, source: Layout, dest: Layout): string {
    let translated: string = "";
    for (let i of text) {
      translated += source.keymap[dest.keymap.indexOf(i.toLowerCase())];
    }
    return translated;
  }
}

let layouts: Layout[] = [
  Layout.fromString("qwerty", 12, "qwertyuiop[]asdfghjkl;'\nzxcvbnm,./~~ "),
  Layout.fromString("workman", 12, "qdrwbjfup;[]ashtgyneoi'\nzxmcvkl,./~~ "),
  Layout.fromString("colemak", 12, "qwfpgjluy;[]arstdhneio'\nzxcvbkm,./~~ "),
  Layout.fromString("colemak dh", 12, "qwfpbjluy;[]arstgmneio'\nzxcdvkh,./~~ "),
  Layout.fromString("dvorak", 12, "',.pyfgcrl/=aoeuidhtns-\n;qjkxbmwvz~~ "),
  Layout.fromString("arensito", 12, "ql~p~~fudk~~arenbgsito~~zw~hjvcymx~~ "),
  Layout.fromString("halmak", 12, "wlrbz;qudj[]shnt,.aeoi'\nfmvc/gpxky~~ "),
  Layout.fromString("norman", 12, "qwdfkjurl;[]asetgynioh'\nzxcvbpm,./~~ "),
  Layout.fromString("capewell", 12, ".ywdfjpluq[]aersgbtnio/\nxzcv;kmh,'~~ "),
  Layout.fromString("asset", 12, "qwfgjypul;[]asetdhnior'\nzxcvbkm,./~~ "),
  Layout.fromString("QGMLWY", 12, "qgmlwyfub;[]dstnriaeoh'\nzxcvjkp,./~~ "),
  Layout.fromString("MTGAP", 12, "ypoujkdlcw[]inea,mhtsr'\nqz/.;bfgvx~~ "),
  Layout.fromString("BEAKL 9", 12, "jhoukgcrfz[]qieaydstnb;\n/,'.xwmlpv~~ "),
  Layout.fromString("Balance Twelve", 12, "plcdw'uoykq;nrstm,aeihv\nzjfgb/.[]x~~ "),
  Layout.fromString("TypeHacK Layout", 12, "jghpfqvou;[]rsntkyiael/\nzwmdbc,'.x~~ "),
  Layout.fromString("apinguefyh-", 12, "',.osdtrlj[]apinguefyh;\nzxcvkbmwq/~~ "),
];
const input: HTMLInputElement = document.querySelector("#input")!;
const output: HTMLInputElement = document.querySelector("#output")!;
const test: HTMLInputElement = document.querySelector("#test")!;
const start: HTMLButtonElement = document.querySelector("#start")!;
const source: HTMLSelectElement = document.querySelector("#source")!;
const dest: HTMLSelectElement = document.querySelector("#dest")!;
const liveChange: HTMLSelectElement = document.querySelector("#liveChange")!;
for (let l of layouts) {
  let opt = document.createElement("option");
  let opt1 = document.createElement("option");
  opt.text = l.name;
  opt1.text = l.name;
  source.add(opt);
  dest.add(opt1);
}
const translate = () => {
  output.value = Layout.translate(
    input.value,
    layouts.find((l) => l.name == source.value) || layouts[0],
    layouts.find((l) => l.name == dest.value) || layouts[0]
  );
  test.value = "";
};
start.onclick = translate;

liveChange.onchange = (event) => {
  const target = event.target as HTMLInputElement;
  if (target && target.checked) {
    input.oninput = translate;
    source.onchange = translate;
    dest.onchange = translate;
  } else {
    input.oninput = null;
    source.onchange = null;
    dest.onchange = null;
  }
}
