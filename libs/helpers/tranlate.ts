import * as viLang from '$locale/vi_VN/locale.json' with { type: 'json'}

export default function translate(key_string: string, locale: string = "vi_VN") {
    const keys = key_string.split('.'); // Tách chuỗi thành mảng các key
    // const localePath = import.meta.resolve("$locale/").replace("file:///", "");
    // console.log(`${localePath}${locale}/locale.json`)
    // const localeText = Deno.readTextFileSync(`${localePath}${locale}/locale.json`);
    const localeJson = viLang.default //JSON.parse(localeText);
    
    let translated: any = localeJson;

    for (const key of keys) {
        if (key in translated) {
            translated = translated[key as keyof typeof translated]; // Tiếp tục duyệt qua các thuộc tính
        } else {
            return key_string; // Trả về undefined nếu key không tồn tại
        }
    }

    return translated;
}

