const classes = (...args: (string | boolean)[]) => args.filter(Boolean).join(' ');

export default classes;