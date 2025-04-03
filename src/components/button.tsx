import "bootstrap/dist/css/bootstrap.css";

interface Props {
  text: string;
  func: () => void;
}

export default function Button({ text, func }: Props) {
  return (
    <button onClick={func} className="btn btn-primary">
      {text}
    </button>
  );
}
