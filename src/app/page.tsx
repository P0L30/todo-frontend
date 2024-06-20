"use client";
import React, { useState } from "react";

interface TodoItem {
  id: string;
  text: string;
  group: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [editedText, setEditedText] = useState<string>("");
  const [filterGroup, setFilterGroup] = useState<string | null>(null);
  const [groups, setGroups] = useState<string[]>([]);

  const addItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      elements: {
        text: { value: string };
        group: { value: string };
      };
    };
    const newItemText = target.elements.text.value;
    const newItemGroup = target.elements.group.value;

    if (newItemText.trim() === "") {
      return;
    }

    const newItem: TodoItem = {
      id: Math.random().toString(),
      text: newItemText,
      group: newItemGroup,
      completed: false,
    };

    setItems([...items, newItem]);

    if (!groups.includes(newItemGroup)) {
      setGroups([...groups, newItemGroup]);
    }

    event.currentTarget.reset();
  };

  const toggleItemCompletion = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  const deleteItem = (index: number) => {
    setItems(items.filter((item, i) => i !== index));
  };

  const editItem = (index: number) => {
    setEditIndex(index);
    setEditedText(items[index].text);
  };

  const saveEditedItem = (index: number) => {
    const editedItem = { ...items[index], text: editedText };
    const updatedItems = [...items];
    updatedItems[index] = editedItem;
    setItems(updatedItems);
    setEditIndex(-1);
    setEditedText("");
  };

  const handleGroupFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedGroup = event.target.value;
    setFilterGroup(selectedGroup === "all" ? null : selectedGroup);
  };

  const filteredItems = filterGroup
    ? items.filter((item) => item.group === filterGroup)
    : items;

  return (
    <div className="flex flex-col items-center justify-start bg-white w-screen h-screen gap-[1vw] p-[1vw]">
      <div className="w-[45vw] h-[8vh] bg-blue-200 flex justify-between items-center font-sans p-[0.5vw] rounded-3xl">
        <p className="text-4xl text-slate-500">My ToDo List</p>
        <div className="flex flex-row justify-center items-center gap-[1vw]">
          <p>Group</p>
          <select
            value={filterGroup || "all"}
            onChange={handleGroupFilterChange}
            className="rounded-3xl bg-white pl-[10px] font-xl border-slate-500px border-[1px]"
          >
            <option value="all">All Groups</option>
            {groups.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-[40vw] flex flex-col items-center justify-center shadow-slate-500 shadow-2xl border-slate-300 border-[1px] rounded-3xl p-[1vw]">
        <div className="w-[30vw] flex flex-row justify-between items-center">
          <div className="flex flex-row items-center justify-between w-[6vw]">
            <p>Check</p>
            <p>Todo</p>
          </div>
          <div className="flex flex-row justify-center items-center w-[10vw] gap-[2vw]">
            <p>Group</p>
            <p>edit</p>
            <p>delete</p>
          </div>
        </div>
        <ul className="w-[40vw] flex list-none flex-col items-center p-[10px] border-b-[1px]">
          {filteredItems.map((item, index) => (
            <li key={item.id} className={item.completed ? "completed" : ""}>
              {editIndex === index ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-[300px] h-[50px] rounded-3xl font-sans"
                  />
                  <button
                    onClick={() => saveEditedItem(index)}
                    className="bg-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M13.89 3.39L16.6 6.11C17.06 6.57 17.02 7.35 16.63 7.75L8.62 15.77L3.06 16.93L4.22 11.35C4.22 11.35 11.82 3.72 12.21 3.32C12.6 2.93 13.43 2.93 13.89 3.39ZM11.16 6.18L5.57 11.79L6.68 12.9L12.22 7.25L11.16 6.18ZM8.19 14.41L13.77 8.81L12.7 7.73L7.11 13.33L8.19 14.41Z"
                        fill="#A8ACBC"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div
                  className={`bg-white flex justify-center items-center w-[30vw] h-[5vh] border-[1px] p-[1vw] border-slate-500 mb-[1vh] rounded-full ${
                    item.completed ? "line-through" : ""
                  }`}
                >
                  <div className="flex gap-[2vw] justify-start items-center felx-row w-[400px]">
                    <input
                      className="rounded-3xl"
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleItemCompletion(index)}
                    />
                    <span
                      className="font-sans font-2xl"
                      onClick={() => toggleItemCompletion(index)}
                    >
                      {item.text}
                    </span>
                  </div>
                  <div className="flex flex-row gap-[2vw]">
                    <span
                      className={`ml-[3px] text-base ${
                        item.completed ? "line-through" : ""
                      }`}
                    >
                      {item.group}
                    </span>
                    <button
                      className="bg-white"
                      onClick={() => editItem(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M13.89 3.39L16.6 6.11C17.06 6.57 17.02 7.35 16.63 7.75L8.62 15.77L3.06 16.93L4.22 11.35C4.22 11.35 11.82 3.72 12.21 3.32C12.6 2.93 13.43 2.93 13.89 3.39ZM11.16 6.18L5.57 11.79L6.68 12.9L12.22 7.25L11.16 6.18ZM8.19 14.41L13.77 8.81L12.7 7.73L7.11 13.33L8.19 14.41Z"
                          fill="#A8ACBC"
                        />
                      </svg>
                    </button>
                    <button
                      className="bg-white"
                      onClick={() => deleteItem(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M17.9167 5C17.9166 5.20411 17.8417 5.40111 17.7061 5.55364C17.5704 5.70617 17.3835 5.80362 17.1808 5.8275L17.0833 5.83333H16.3792L15.3533 16.2667C15.2975 16.8328 15.0331 17.3579 14.6115 17.7399C14.1899 18.1219 13.6414 18.3334 13.0725 18.3333H6.92749C6.35862 18.3334 5.81006 18.1219 5.3885 17.7399C4.96693 17.3579 4.70251 16.8328 4.64666 16.2667L3.62083 5.83333H2.91666C2.69565 5.83333 2.48369 5.74554 2.32741 5.58926C2.17113 5.43298 2.08333 5.22101 2.08333 5C2.08333 4.77899 2.17113 4.56702 2.32741 4.41074C2.48369 4.25446 2.69565 4.16667 2.91666 4.16667H7.08333C7.08333 3.78364 7.15877 3.40437 7.30535 3.05051C7.45192 2.69664 7.66676 2.37511 7.9376 2.10427C8.20844 1.83343 8.52997 1.61859 8.88383 1.47202C9.2377 1.32544 9.61697 1.25 9.99999 1.25C10.383 1.25 10.7623 1.32544 11.1162 1.47202C11.47 1.61859 11.7916 1.83343 12.0624 2.10427C12.3332 2.37511 12.5481 2.69664 12.6946 3.05051C12.8412 3.40437 12.9167 3.78364 12.9167 4.16667H17.0833C17.3043 4.16667 17.5163 4.25446 17.6726 4.41074C17.8289 4.56702 17.9167 4.77899 17.9167 5ZM11.875 7.70833C11.724 7.70834 11.578 7.76304 11.4642 7.86231C11.3504 7.96158 11.2764 8.09871 11.2558 8.24833L11.25 8.33333V14.1667L11.2558 14.2517C11.2764 14.4013 11.3505 14.5383 11.4643 14.6376C11.5781 14.7368 11.724 14.7915 11.875 14.7915C12.026 14.7915 12.1719 14.7368 12.2857 14.6376C12.3995 14.5383 12.4736 14.4013 12.4942 14.2517L12.5 14.1667V8.33333L12.4942 8.24833C12.4736 8.09871 12.3996 7.96158 12.2858 7.86231C12.1719 7.76304 12.026 7.70834 11.875 7.70833ZM8.12499 7.70833C7.97396 7.70834 7.82804 7.76304 7.71422 7.86231C7.6004 7.96158 7.52637 8.09871 7.50583 8.24833L7.49999 8.33333V14.1667L7.50583 14.2517C7.52641 14.4013 7.60046 14.5383 7.71428 14.6376C7.8281 14.7368 7.97399 14.7915 8.12499 14.7915C8.276 14.7915 8.42189 14.7368 8.53571 14.6376C8.64953 14.5383 8.72358 14.4013 8.74416 14.2517L8.74999 14.1667V8.33333L8.74416 8.24833C8.72362 8.09871 8.64959 7.96158 8.53577 7.86231C8.42195 7.76304 8.27603 7.70834 8.12499 7.70833ZM9.99999 2.91667C9.66847 2.91667 9.35053 3.04836 9.11611 3.28278C8.88169 3.5172 8.74999 3.83515 8.74999 4.16667H11.25C11.25 3.83515 11.1183 3.5172 10.8839 3.28278C10.6495 3.04836 10.3315 2.91667 9.99999 2.91667Z"
                          fill="#A8ACBC"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <form
          onSubmit={addItem}
          className="flex justify-center items-center flex-col mt-[1vw]"
        >
          <div className="flex justify-center items-center flex-col bg-white w-[100%]">
            <input
              className="w-[25vw] h-[4vh] rounded-3xl bg-white pl-[10px] font-xl mb-[10px] border-slate-500px border-[1px]"
              type="text"
              placeholder="Add new item"
              name="text"
              autoComplete="off"
              required
            />
            <input
              className="w-[25vw] h-[4vh] rounded-3xl bg-white pl-[10px] font-xl mb-[10px] border-slate-500px"
              placeholder="Group"
              name="group"
              autoComplete="off"
              required
            />
            <button
              type="submit"
              className="w-[15vw] h-[4vh] bg-blue-200 rounded-3xl text-xl text-slate-500"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;

// delete
//  <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="20"
//     height="20"
//     viewBox="0 0 20 20"
//     fill="none"
//   >
//     <path
//       d="M17.9167 5C17.9166 5.20411 17.8417 5.40111 17.7061 5.55364C17.5704 5.70617 17.3835 5.80362 17.1808 5.8275L17.0833 5.83333H16.3792L15.3533 16.2667C15.2975 16.8328 15.0331 17.3579 14.6115 17.7399C14.1899 18.1219 13.6414 18.3334 13.0725 18.3333H6.92749C6.35862 18.3334 5.81006 18.1219 5.3885 17.7399C4.96693 17.3579 4.70251 16.8328 4.64666 16.2667L3.62083 5.83333H2.91666C2.69565 5.83333 2.48369 5.74554 2.32741 5.58926C2.17113 5.43298 2.08333 5.22101 2.08333 5C2.08333 4.77899 2.17113 4.56702 2.32741 4.41074C2.48369 4.25446 2.69565 4.16667 2.91666 4.16667H7.08333C7.08333 3.78364 7.15877 3.40437 7.30535 3.05051C7.45192 2.69664 7.66676 2.37511 7.9376 2.10427C8.20844 1.83343 8.52997 1.61859 8.88383 1.47202C9.2377 1.32544 9.61697 1.25 9.99999 1.25C10.383 1.25 10.7623 1.32544 11.1162 1.47202C11.47 1.61859 11.7916 1.83343 12.0624 2.10427C12.3332 2.37511 12.5481 2.69664 12.6946 3.05051C12.8412 3.40437 12.9167 3.78364 12.9167 4.16667H17.0833C17.3043 4.16667 17.5163 4.25446 17.6726 4.41074C17.8289 4.56702 17.9167 4.77899 17.9167 5ZM11.875 7.70833C11.724 7.70834 11.578 7.76304 11.4642 7.86231C11.3504 7.96158 11.2764 8.09871 11.2558 8.24833L11.25 8.33333V14.1667L11.2558 14.2517C11.2764 14.4013 11.3505 14.5383 11.4643 14.6376C11.5781 14.7368 11.724 14.7915 11.875 14.7915C12.026 14.7915 12.1719 14.7368 12.2857 14.6376C12.3995 14.5383 12.4736 14.4013 12.4942 14.2517L12.5 14.1667V8.33333L12.4942 8.24833C12.4736 8.09871 12.3996 7.96158 12.2858 7.86231C12.1719 7.76304 12.026 7.70834 11.875 7.70833ZM8.12499 7.70833C7.97396 7.70834 7.82804 7.76304 7.71422 7.86231C7.6004 7.96158 7.52637 8.09871 7.50583 8.24833L7.49999 8.33333V14.1667L7.50583 14.2517C7.52641 14.4013 7.60046 14.5383 7.71428 14.6376C7.8281 14.7368 7.97399 14.7915 8.12499 14.7915C8.276 14.7915 8.42189 14.7368 8.53571 14.6376C8.64953 14.5383 8.72358 14.4013 8.74416 14.2517L8.74999 14.1667V8.33333L8.74416 8.24833C8.72362 8.09871 8.64959 7.96158 8.53577 7.86231C8.42195 7.76304 8.27603 7.70834 8.12499 7.70833ZM9.99999 2.91667C9.66847 2.91667 9.35053 3.04836 9.11611 3.28278C8.88169 3.5172 8.74999 3.83515 8.74999 4.16667H11.25C11.25 3.83515 11.1183 3.5172 10.8839 3.28278C10.6495 3.04836 10.3315 2.91667 9.99999 2.91667Z"
//       fill="#A8ACBC"
//     />
//   </svg>
//edit
{
  /* <svg
xmlns="http://www.w3.org/2000/svg"
width="20"
height="20"
viewBox="0 0 20 20"
fill="none"
>
<path
  d="M13.89 3.39L16.6 6.11C17.06 6.57 17.02 7.35 16.63 7.75L8.62 15.77L3.06 16.93L4.22 11.35C4.22 11.35 11.82 3.72 12.21 3.32C12.6 2.93 13.43 2.93 13.89 3.39ZM11.16 6.18L5.57 11.79L6.68 12.9L12.22 7.25L11.16 6.18ZM8.19 14.41L13.77 8.81L12.7 7.73L7.11 13.33L8.19 14.41Z"
  fill="#A8ACBC"
/>
</svg> */
}
//save
{
  /* <svg
xmlns="http://www.w3.org/2000/svg"
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
>
<path
  fill-rule="evenodd"
  clip-rule="evenodd"
  d="M12 1C5.925 1 1 5.925 1 12C1 18.075 5.925 23 12 23C18.075 23 23 18.075 23 12C23 5.925 18.075 1 12 1ZM16.768 10.14C16.8558 10.0396 16.9226 9.92274 16.9646 9.79617C17.0065 9.6696 17.0227 9.53591 17.0123 9.40298C17.0018 9.27005 16.9648 9.14056 16.9036 9.02213C16.8423 8.90369 16.758 8.79871 16.6555 8.71334C16.5531 8.62798 16.4346 8.56396 16.3071 8.52506C16.1796 8.48616 16.0455 8.47316 15.9129 8.48683C15.7802 8.50049 15.6517 8.54055 15.5347 8.60463C15.4178 8.66872 15.3149 8.75554 15.232 8.86L10.932 14.019L8.707 11.793C8.5184 11.6108 8.2658 11.51 8.0036 11.5123C7.7414 11.5146 7.49059 11.6198 7.30518 11.8052C7.11977 11.9906 7.0146 12.2414 7.01233 12.5036C7.01005 12.7658 7.11084 13.0184 7.293 13.207L10.293 16.207C10.3913 16.3052 10.5089 16.3818 10.6384 16.4321C10.7679 16.4823 10.9065 16.505 11.0453 16.4986C11.184 16.4923 11.32 16.4572 11.4444 16.3954C11.5688 16.3337 11.6791 16.2467 11.768 16.14L16.768 10.14Z"
  fill="#16CCAB"
/>
</svg> */
}

// loading

{
  /* <svg
aria-hidden="true"
className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
viewBox="0 0 100 101"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
  fill="currentColor"
/>
<path
  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
  fill="currentFill"
/>
</svg> */
}
