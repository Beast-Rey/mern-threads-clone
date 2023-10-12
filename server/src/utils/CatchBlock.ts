export function CatchBlock(error: any, res: any) {
  console.log(`[error]: ${error.message}`);
  res.status(500).json({ errors: error.message });
}
