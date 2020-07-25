interface StyleStore {
  host: string;
  path: Path[];
  css: CssSetting[];
}

interface CssSetting {
  key: string;
  value: string;
}

interface Path {
  id: string;
  cls: string;
  index: number;
}
