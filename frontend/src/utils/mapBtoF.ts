// Map constant in frontend corresponding with backend

export enum TypeDataset {
  DETECTION,
  CLASSIFICATION,
  TRACKING,
}

export const mapTypeDataset = (typeDataset: string): TypeDataset => {
  if (typeDataset === 'de') return TypeDataset.DETECTION;
  if (typeDataset === 'tr') return TypeDataset.TRACKING;
  if (typeDataset === 'cl') return TypeDataset.CLASSIFICATION;
  throw new Error(`typeDataset not supported ${typeDataset}`);
};

export const reMapTypeDataset = (typeDataset: TypeDataset): string => {
  if (typeDataset === TypeDataset.DETECTION) return 'de';
  if (typeDataset === TypeDataset.CLASSIFICATION) return 'cl';
  if (typeDataset === TypeDataset.TRACKING) return 'tr';
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`typeDataset not supported ${typeDataset}`);
};

// LabelDataModel
export enum TypeLabel {
  RECTANGLE = 'RECTANGLE',
  POLYGON = 'POLYGON',
  ATTRIBUTE = 'ATTRIBUTE',
  CLASSIFICATION = 'CLASSIFICATION',
}

export const mapTypeLabel = (typeLabel: string): TypeLabel => {
  if (typeLabel.toLowerCase() === 'rect') return TypeLabel.RECTANGLE;
  if (typeLabel.toLowerCase() === 'poly') return TypeLabel.POLYGON;
  if (typeLabel.toLowerCase() === 'attr') return TypeLabel.ATTRIBUTE;
  if (typeLabel.toLowerCase() === 'cls') return TypeLabel.CLASSIFICATION;
  throw Error('Error typeLabel!');
};

export const reverseTypeLabel = (typeLabel: TypeLabel): string => {
  if (typeLabel === TypeLabel.RECTANGLE) return 'rect';
  if (typeLabel === TypeLabel.POLYGON) return 'poly';
  if (typeLabel === TypeLabel.ATTRIBUTE) return 'attr';
  if (typeLabel === TypeLabel.CLASSIFICATION) return 'cls';
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw Error(`Error typeLabel: ${typeLabel}!`);
};

export enum FlagObject {
  USER_CREATED = 'USER_CREATED',
  PREDICTED = 'PREDICTED',
  TRUE_POSITIVE = 'TRUE_POSITIVE',
  FALSE_POSITIVE = 'FALSE_POSITIVE',
}

export const mapFlagObject = (flag: string): FlagObject => {
  if (flag === '-2') {
    return FlagObject.PREDICTED;
  }
  if (flag === '-1') {
    return FlagObject.USER_CREATED;
  }
  if (flag === '0') {
    return FlagObject.FALSE_POSITIVE;
  }
  if (flag === '1') {
    return FlagObject.TRUE_POSITIVE;
  }
  throw Error(`Error flag: ${flag}!`);
};

export const reverseFlagObject = (flagObject: FlagObject): string => {
  if (flagObject === FlagObject.PREDICTED) {
    return '-2';
  }
  if (flagObject === FlagObject.USER_CREATED) {
    return '-1';
  }
  if (flagObject === FlagObject.FALSE_POSITIVE) {
    return '0';
  }
  if (flagObject === FlagObject.TRUE_POSITIVE) {
    return '1';
  }
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw Error(`Error typeLabel ${flagObject}!`);
};
