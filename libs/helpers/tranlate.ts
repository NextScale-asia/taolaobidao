export default function translate(key_string: string, locale: string = "vi_VN") {
    const keys = key_string.split('.'); // Tách chuỗi thành mảng các key
    const localePath = import.meta.resolve("$locale/").replace("file:///", "");
    const localeText = Deno.readTextFileSync(`${localePath}${locale}/locale.json`);
    const localeJson = JSON.parse(localeText);
    
    let translated = localeJson;

    for (const key of keys) {
        if (translated[key] !== undefined) {
            translated = translated[key]; // Tiếp tục duyệt qua các thuộc tính
        } else {
            return undefined; // Trả về undefined nếu key không tồn tại
        }
    }

    return translated;
}

