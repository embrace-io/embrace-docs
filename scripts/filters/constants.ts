export const OP_LABELS: Record<string, string> = {
  eq: 'Equals',
  neq: 'Not Equals',
  gt: 'Greater Than',
  lt: 'Less Than',
  gte: 'Greater Than or Equal',
  lte: 'Less Than or Equal',
  in: 'In',
  nin: 'Not In',
  contains: 'Contains',
  startswith: 'Starts With',
  endswith: 'Ends With',
};

export const TYPE_LABELS: Record<string, string> = {
  string: 'String',
  choice_string: 'Choice (String)',
  number: 'Number',
  integer: 'Integer',
  boolean: 'Boolean',
  date: 'Date',
  datetime: 'DateTime',
};

export const PLATFORM_LABELS: Record<string, string> = {
  an: 'Android',
  io: 'iOS',
  rn: 'React Native',
  fl: 'Flutter',
  un: 'Unity',
  we: 'Web',
};

// Platform and framework blocklists (mirrors frontend logic)
export enum OsTypes {
  IOS = 'ios',
  ANDROID = 'android',
  WEB = 'web',
}

export enum Framework {
  NATIVE = 'native',
  UNITY = 'unity',
  FLUTTER = 'flutter',
  REACT_NATIVE = 'react_native',
}

export const platformBlockLists: Record<string, Record<string, boolean>> = {
  [OsTypes.IOS]: {
    environment: true,
    manufacturer: true,
    has_anr: true,
    'crash.method': true,
    group_id: true,
  },
  [OsTypes.ANDROID]: {
    environment_detail: true,
    model_type: true,
    module: true,
    symbol: true,
    group_id: true,
  },
  [OsTypes.WEB]: {
    has_anr: true,
    manufacturer: true,
    model_type: true,
  },
  [Framework.NATIVE]: { js_patch: true, unity_version: true, framework: true },
  [Framework.UNITY]: { js_patch: true, framework: true },
  [Framework.FLUTTER]: { js_patch: true, framework: true },
  [Framework.REACT_NATIVE]: { unity_version: true },
};

