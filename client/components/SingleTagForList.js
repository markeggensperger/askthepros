import React from 'react'

const SingleTag = ({tag, handleClick}) => {
  const n = Object.keys(tag.cocktails).length
  if (n > 0 || tag.selection === 'likes' || tag.selection === 'dislikes') {
    return (
      <div className={`tag_header ${tag.selection}`}>
        <p className="tag_name" onClick={() => handleClick(tag)}>
          {tag.tag}
        </p>
      </div>
    )
  } else {
    return (
      <div className={`tag_header ${tag.selection}`}>
        <p className="disabled_tag" >
          {tag.tag}
        </p>
      </div>
    )
  }
}

export default SingleTag
