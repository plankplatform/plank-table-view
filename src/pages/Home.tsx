import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Plank</h1>
      <Button variant="ghost">Click me</Button>
    </div>
  );
}
