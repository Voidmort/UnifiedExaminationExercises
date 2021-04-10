import re
import json

pattern = '#+\s'

def formatHeading(heading):
    heading['heading1'] = 0
    heading['heading2'] = -1
    heading['heading3'] = -1
    heading['heading4'] = -1
    heading['heading5'] = -1
    heading['heading6'] = -1

def updateHeading(current, headId, heading):
    for i in range(1, 6):
        if len(current) == i:
            heading['heading%r' % i] = headId

def mk2dict(filename):
    heading = {
        'heading1': 0,
        'heading2': -1,
        'heading3': -1,
        'heading4': -1,
        'heading5': -1,
        'heading6': -1
    }
    data = {"title": [], "data": []}
    headId = 1
    current = None
    preCurrent = '$'
    parentID = 0
    id2Title = {}
    with open(filename, 'r', encoding='UTF-8') as f:
        for i in f.readlines():
            title = {"content": ""}
            if not re.match(pattern, i.strip(' \t\n')):
                data["data"][-1]["content"] += i
                continue
            i = i.strip(' \t\n')
            current = i.split(' ')[0]
            # 当前标题级别比前一个小，则当前标题的父类标题是上一个的headId
            # 注释：#越多级别越小
            # 不论大多少个级别，只要父类级别大就是它的父类
            if len(current) > len(preCurrent):
                parentID = headId - 1
                # 更新当前级别父类
                updateHeading(current, parentID, heading)
            # 当前级别比父类级别大，则去heading中寻找记录过的父类级别
            # 注释：#越少级别越大
            elif len(current) < len(preCurrent):
                length = len(current)
                # 当在文中出现一级标题的时候还原所有父类级别到初始值
                if length == 1:
                    formatHeading(heading)
                    # 给当父类结果类赋值
                    parentID = 0
                else:
                    getVal = heading['heading%r' % length]
                    # 如果有记录过该级别的父类项
                    if getVal != -1:
                        parentID = getVal
                    # 改级别项没有记录则依次向上找父类，指导找到一级标题
                    else:
                        for j in range(length, 1, -1):
                            tempVal = heading['heading%r' % j]
                            if tempVal != -1:
                                parentID = tempVal
                                break
            
            titleName = i[len(current):].strip(' \t\n')
            title['titleName'] = titleName
            title['titleID'] = headId
            title['parentID'] = parentID
            id2Title[headId] = titleName
            data["data"].append(title)
            preCurrent = current
            headId += 1
    data["title"] = id2Title
    return data

if __name__ == '__main__':
    data = mk2dict("信息资源管理国考思考题.md")
    data = json.dumps(data, ensure_ascii=False)
    fo = open("data.json", "w")
    fo.write(data)
    fo.close()

