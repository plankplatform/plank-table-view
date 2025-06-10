import { useParams } from 'react-router-dom';

export default function ContractEdit() {
  const { id } = useParams();
  return <div>Modifica contratto ID: {id}</div>;
}
