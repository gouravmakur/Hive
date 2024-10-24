import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

// This control is passed by the parent component when this component is beign called, so the parent component get the controll over this component

// Here the RTE will be called by the PostForm and it will pass control to get contorl of the RTE

function RTE({name, control, label, defaultValue=""}) {

  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
      <Controller 
        name = {name || "content"}
        control={control} // here we pass the control to the parent component
        // the render render any thing we want to render and the field track changes in the filed , we can give onChange , onBlur etc...

        render={({field : {onChange , value}}) => (
            <Editor
                apiKey='om9ym7p7nur5gbrel7rltxtg13wg2n4w633wp60e2ommk7wp'
                value={value}
                init={
                {
                    height: 500,
                    directionality: 'ltr',
                    menubar: true,
                    plugins: [
                        "image",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "anchor",
                    ],
                    toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",placeholder: 'Tell Your Story...',
                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }"
                }
            }
                onEditorChange={onChange} // any change in the editor is governed by the onChange
            />
        )} 

    />
    </div>
  )
}

export default RTE
