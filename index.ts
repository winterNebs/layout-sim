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
  Layout.fromString("colemak dh", 12, "qwfpbjluy;[]arstgmneio'\nzxcdvkh,./~~ "),
  Layout.fromString("dvorak", 12, "',.pyfgcrl/=aoeuidhtns-\n;qjkxbmwvz~~ "),
  Layout.fromString("arensito", 12, "ql~p~~fudk~~arenbgsito~~zw~hjvcymx~~ "),
];
const input: HTMLInputElement = document.querySelector("#input")!;
const output: HTMLInputElement = document.querySelector("#output")!;
const test: HTMLInputElement = document.querySelector("#test")!;
const start: HTMLButtonElement = document.querySelector("#start")!;
const source: HTMLSelectElement = document.querySelector("#source")!;
const dest: HTMLSelectElement = document.querySelector("#dest")!;
for (let l of layouts) {
  let opt = document.createElement("option");
  let opt1 = document.createElement("option");
  opt.text = l.name;
  opt1.text = l.name;
  source.add(opt);
  dest.add(opt1);
}
start.onclick = () => {
  output.value = Layout.translate(
    input.value,
    layouts.find((l) => l.name == source.value) || layouts[0],
    layouts.find((l) => l.name == dest.value) || layouts[0]
  );
  test.value = "";
};
