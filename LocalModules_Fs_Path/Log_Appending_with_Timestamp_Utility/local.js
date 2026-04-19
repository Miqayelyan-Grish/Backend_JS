export default function systemLogger(msg) {
    const time = new Date().toUTCString();
    return `The '${msg}' message hass been send at [${time}]\n`;
}
