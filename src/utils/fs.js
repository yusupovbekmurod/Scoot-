import fs from "fs";

export function readFile(filePath) {
    if (fs.existsSync(process.cwd() + "/src" + "/database/" + filePath + ".json"))
        return JSON.parse(fs.readFileSync(
            process.cwd() + "/src" + "/database/" + filePath + ".json",
            "utf-8"
        ));
}

export function writeFile(filePath, data) {
    fs.writeFileSync(
        process.cwd() + "/src" + "/database/" + filePath  + ".json",
        JSON.stringify(data, null, 4)
    );
}
