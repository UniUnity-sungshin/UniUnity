//글 에디터
const Editor = toastui.Editor;

const editor = new Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical'
  });
  
  editor.getMarkdown();

  
//카테고리 선택
var selectedValue = "";
  var selectPostCategoryElement = document.getElementById('select_post_category');
  selectPostCategoryElement.addEventListener('change', function () {
    selectedValue = this.value;
    console.log(selectedValue); //제휴 소식은 선택시 콘솔에 1로 나옴

});