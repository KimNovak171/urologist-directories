const fs = require("fs/promises");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");

async function removeTxtRecursive(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err && err.code === "ENOENT") return;
    throw err;
  }

  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      await removeTxtRecursive(full);
    } else if (ent.isFile() && path.extname(ent.name).toLowerCase() === ".txt") {
      await fs.unlink(full);
    }
  }
}

removeTxtRecursive(outDir).catch((err) => {
  console.error(err);
  process.exit(1);
});
