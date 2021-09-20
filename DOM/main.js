const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  if (text === "") {
    input.focus();
    return;
  }
  // 2. 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
  const item = createItem(text);
  // 3. items 컨테이너안에 새로 만든 아이템을 추가한다.
  items.appendChild(item);
  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: "center" });
  // 5. 인풋을 초기화한다.
  input.value = "";
  input.focus();
}
let id = 0; // UUID와같은 API쓰는게 좋다
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
        <div class="item">
          <span class="item__name">${text}</span>
          <button class="item__delete">
            <i class="fas fa-trash-alt" data-id=${id}></i>
          </button>
        </div>
        <div class="item__divider"></div>
  `;
  id++;

  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keydown", (e) => {
  // keydown일 경우에는 누르자마자 동작하기 때문에 'a'키가 먹히지 않지만
  // keyup을 사용할 경우 키를 뗀 순간에 작동하기 때문에 a키가 입력되는것을 확인할 수 있다.
  if (e.key === "a") {
    e.preventDefault();
  }

  // 한글처럼 여러개의 키를 사용하여 한 글자를 만드는 경우에 keydown을 사용하게되면
  // 중간중간에 이벤트가 발생할 수 있기 때문에 isComposing 상태라면 즉, 글자가 완성되기전 상태라면
  // 이벤트를 발생시키지 않도록하여 문제를 해결할 수 있다.
  if (e.isComposing) {
    return;
  }
  if (e.key === "Enter") {
    onAdd();
  }
});

items.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
