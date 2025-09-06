import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillProps {
  value?: string;
  onChange?: (value: string) => void;
}

const modules = {
    toolbar: [ // 툴바 그룹
      [{ header: [1, 2, false] }], // 헤더 그룹 내부에 각각의 요소는 곧 버튼과 기능을 의미
      ['bold', 'italic', 'underline', 'strike', 'blockquote'], // 스타일 그룹
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' }, // 내어쓰기
        { indent: '+1' }, // 들여쓰기
      ],
      ['link', 'image'],
      [{ color: [] }, { background: [] }], // 폰트색상, 화면색상
      [{ font: [] }], // 폰트스타일
      [{ align: [] }], // 정렬
      [{ script: 'sub' }, { script: 'super' }], // 첨자
      ['code', 'code-block'], // 코드 블록 및 인라인 코드를 위한 기능 추가
      ['clean'], // 지우기
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
    'font',
    'align',
    'script',
    'code',
    'code-block', // 코드 블록 및 인라인 코드를 위한 포맷 추가
];

function Quill({ value, onChange }: QuillProps) {
  return (
    <div className="w-full bg-white rounded-md p-2">
        <ReactQuill 
            theme="snow"
            className="quill w-full h-[300px] bg-white rounded-md"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
    />  
    </div>
  );
}

export default Quill;