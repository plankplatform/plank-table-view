import { useParams } from 'react-router-dom';

export default function ContractView() {
  const { id } = useParams();
  return <div>Visualizza contratto ID: {id}</div>;
}
