class Inspector {

  constructor() {
    this.books = []
  }

  load() {
    xmlhttp = new XMLHttpRequest()
    xmlhttp.open('GET', 'base', true)
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.info("YES!")
      console.info(xmlhttp.responseText)
    }
    xmlhttp.send()
  }

  run() {
    exams = document.getElementById('examListUl').children
    for (exam of exams) {
      qid = exam.getAttribute('qs_id')
      key = books[qid]
      list = exam.getElementsByClassName('solution')[0].children[0].children

      for (node of list) {
        hash = node.getAttribute('hash')
        if (key === hash) {
          node.click()
          console.info('MATCH: ' + qid + ' - ' + hash)
        }
      }
    }
  }

  hookAnswer() {
    var exams = document.getElementById('examListUl').children
    var object = this
    for (var exam of exams) {
      var list = exam.getElementsByClassName('solution')[0].children[0].children

      for (var node of list) {

        node.addEventListener('click', function() {
          var book = {
            "id": this.parentNode.parentNode.parentNode.getAttribute('qs_id'),
            "hash": this.getAttribute('hash')
          }
          object.books.push(book)

          console.info('MATCH: ' + book.id + ' - ' + book.hash)
        });
      }
    }
  }
  //
  // hookSubmit() {
  //   var button = document.getElementsByClassName('enterBut enterButdefault')
  //   button.addEventListener('click', function() {
  //
  //   })
  // }

  upload() {
    var tag = document.createElement('script')
    var arg = JSON.stringify(this.books, null, null);
    tag.id = 'dynamic-tag'
    tag.src = 'http://52.197.92.204:8000/exam/upload'+'?data='+arg
    tag.setAttribute('type', 'text/javascript')
    window.document.head.appendChild(tag)
  }

}


  console.info('ready')
  var ins = new Inspector()
  ins.hookAnswer()
  // ins.hookSubmit()
