class Inspector {

    constructor() {
        this.books = []
    }

    innerToolBar() {
        console.debug('inner ToolBar');

        let object = this;
        let toolBar = document.createElement('div');
        toolBar.id = 'toolBar';
        toolBar.setAttribute('style', 'top: 415px; left: 0%; width: 150px; height: 260px; position: fixed; margin-left: 30px; background-color: #F25D8E; opacity: 0.55; border-radius: 5px;');

        let btn1 = document.createElement('div');
        btn1.setAttribute('style', 'margin: 10px 15px; width: 120px; height: 110px; float: left; background-color: #FFF; border-radius: 5px; text-align: center; vertical-align: middle;');
        let span1 = document.createElement('span');
        span1.setAttribute('style', 'color: #F25D8E; line-height: 110px; ');
        span1.innerHTML = '自动答题';
        btn1.appendChild(span1);
        btn1.addEventListener('click', function() {
            object.load(object);
        });

        let btn2 = document.createElement('div');
        btn2.setAttribute('style', 'margin: 10px 15px; width: 120px; height: 110px; float: left; background-color: #FFF; border-radius: 5px; text-align: center; vertical-align: middle;');
        let span2 = document.createElement('span');
        span2.setAttribute('style', 'color: #F25D8E; line-height: 110px; ');
        span2.innerHTML = '上传答案';
        btn2.appendChild(span2);

        btn2.addEventListener('click', function() {
            object.upload(object);
        });

        toolBar.appendChild(btn1);
        toolBar.appendChild(btn2);
        document.body.getElementsByClassName('answerRight')[0].appendChild(toolBar)
    }

    load(object) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', 'http://127.0.0.1:8000/exam/load/', true);

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                object.books = JSON.parse(xmlhttp.responseText);
                object.run(object)
            }
        };
        xmlhttp.send()
    }

    run(object) {
        let exams = document.getElementById('examListUl').children;
        let count = 0;
        for (let exam of exams) {
            let qid = exam.getAttribute('qs_id');
            let key = object.books[qid];
            let list = exam.getElementsByClassName('solution')[0].children[0].children;

            for (let node of list) {
                let hash = node.getAttribute('hash');
                if (key === hash) {
                    node.click();
                    // console.info('MATCH: ' + qid + ' - ' + hash)
                    count += 1
                }
            }
        }
        console.debug('共匹配'+count+'条答案');
    }

    hookAnswer() {
        console.debug('hook answer');
        let exams = document.getElementById('examListUl').children;
        let object = this;
        for (let exam of exams) {
            let list = exam.getElementsByClassName('solution')[0].children[0].children;

            for (let node of list) node.addEventListener('click', function () {
                let id = this.parentNode.parentNode.parentNode.getAttribute('qs_id');
                let hash = this.getAttribute('hash');
                object.books[id] = hash;

                console.info('MATCH: ' + id + ' - ' + hash)
            });
        }
    }

    upload(object) {

        let arg = JSON.stringify(object.books, null, null);
        let url = 'http://127.0.0.1:8000/exam/upload/'+'?data='+arg;

        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', url, true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                console.debug(xmlhttp.responseText);
            }
        };
        xmlhttp.send(null)
    }
}


window.onload = function() {
    let ins = new Inspector();
    ins.hookAnswer();   // hook正确答案勾选动作
    ins.innerToolBar(); // 设置操作面板
};
