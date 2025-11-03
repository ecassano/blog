export async function asyncDelay(ms: number = 0, verbose = false) {
  if (ms <= 0) return;

  if (verbose) {
    console.log(`Delaying for ${ms}ms...`);
  }

  await new Promise(resolve => setTimeout(resolve, ms));
}
