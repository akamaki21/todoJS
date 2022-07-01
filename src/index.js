import "./styles.css";

const onClickAdd = () => {
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";
  createIncompleteList(inputText);
};

// 未完了リストに指定の要素を追加
const createIncompleteList = (text) => {
  // DOM生成(div, li, button)
  const div = document.createElement("div");
  div.className = "list-row";
  const li = document.createElement("li");
  li.innerText = text;
  // button
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(div)を未完了リストから削除
    // 押された削除ボタンの親タグ(div)を完了リストに追加して
    const completeTarget = completeButton.parentNode;
    const completeText = completeTarget.firstElementChild.innerText;
    deleteFromIncompetelist(completeTarget);

    // div以下を初期化して、テキストと戻すボタン追加
    completeTarget.textContent = null;
    const li = document.createElement("li");
    li.innerText = completeText;
    const returnButton = document.createElement("button");
    returnButton.innerText = "戻す";
    returnButton.addEventListener("click", () => {
      const returnTarget = returnButton.parentNode;
      const returnText = returnTarget.firstElementChild.innerText;
      deleteFromCompetelist(returnTarget);
      // 未完了リストへ追加＊＊＊なんか面倒くさいことこの上ないんですけど！
      // →入れ子になるので、<<関数化>>する。
      createIncompleteList(returnText);
    });
    completeTarget.appendChild(li);
    completeTarget.appendChild(returnButton);
    console.log(completeTarget);

    document.getElementById("complete-list").appendChild(completeTarget);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(div)を未完了リストから削除
    deleteFromIncompetelist(deleteButton.parentNode);
  });
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了TODOへ挿入
  document.getElementById("incomplete-list").appendChild(div);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompetelist = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 完了リストから指定の要素を削除
const deleteFromCompetelist = (target) => {
  document.getElementById("complete-list").removeChild(target);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
