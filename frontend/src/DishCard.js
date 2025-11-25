import React from "react";

export default function DishCard({ dish, onToggle, isExternal }) {
  return (
    <div className="dish-card">
      <img src={dish.imageUrl} alt={dish.dishName} />

      <div className="dish-name">{dish.dishName}</div>

      <div
        className={
          "status-pill " +
          (dish.isPublished ? "published" : "unpublished")
        }
      >
        {dish.isPublished ? "Published" : "Unpublished"}
      </div>

      <button
        onClick={onToggle}
        className={`primary-btn ${
          dish.isPublished ? "unpublish" : "publish"
        }`}
      >
        {dish.isPublished ? "Unpublish" : "Publish"}
      </button>
    </div>
  );
}
