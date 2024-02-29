import { useState } from "react";

const ListCourse = () => {
  const [listeDeCourse, setListDeCourse] = useState([]);

  return (
    <div>
      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const course = formData.get("course");
          const quantity = formData.get("quantity");

          const newItem = {
            course: course,
            quantity: quantity,
          };

          setListDeCourse([...listeDeCourse, newItem]);
          event.target.reset();
        }}
      >
        <label htmlFor="course">Ajouter un produit</label>
        <input type="text" name="course" id="course" />
        <label htmlFor="quantity">Combien ?</label>
        <input type="number" name="quantity" id="quantity" />
        <input type="submit" />
      </form>

      {listeDeCourse.length > 0 ? (
        <div>
          <h2>Ma liste de course</h2>
          {listeDeCourse.map((produit) => {
            return (
              <Todo
                key={produit.course}
                oneTodo={produit.course}
                quantity={produit.quantity}
                handleDeleteTodo={() => {
                  const newListDeCourse = listeDeCourse.filter((oneCourse) => {
                    if (oneCourse.course !== produit.course) {
                      return oneCourse;
                    }
                  });

                  setListDeCourse(newListDeCourse);
                }}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ListCourse;
