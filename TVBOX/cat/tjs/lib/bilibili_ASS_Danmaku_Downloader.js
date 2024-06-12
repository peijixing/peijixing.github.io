/*
* @File     : bilibili_ASS_Danmaku_Downloader.js
* @Author   : jade
* @Date     : 2024/3/14 13:19
* @Email    : jadehh@1ive.com
* @Software : Samples
* @Desc     :
*/
function parseXML(json) {
    let list = [];
       /**
     * <d p="{time},{type},{size},{color},{timestamp},{pool},{uid_crc32},{row_id}">
     *
     * {Text}
     * timeΪ��Ļ����Ƶ���ʱ�� -->
     * typeΪ��Ļ���� -->
     * sizeΪ�����С -->
     * colorΪʮ���Ƶ�RGB��ɫ��16����ת10���ƣ� -->
     * timestampΪ��Ļ����ʱ�����unixʱ����� -->
     * poolΪ��Ļ�� -->
     * uid_crc32Ϊ������uid��crc32 -->
     */
    Array.from(json.danmuku).forEach(x => {
        let start = Number(x[0]);
        let content = x[4];
        list.push(`<d p="${start},1,25,16777215,1659282294,0,8b53b65c,1108899274487246080"><![CDATA[${content}]]></d>`)
    });
    return String.raw`<?xml version="1.0" encoding="UTF-8"?><i><chatserver>chat.bilibili.com</chatserver><chatid>52175602</chatid><mission>0</mission><maxlimit>1000</maxlimit><state>0</state><real_name>0</real_name><source>k-v</source>` + list.join('') + "</i>"
}
export {parseXML}

