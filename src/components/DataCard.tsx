import { Card } from './ui/card';

interface DataCardProps {
  title: string;
  description: string;
  size?: 'small' | 'medium' | 'large';
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  description,
  size = 'medium',
}) => {
  const sizeVal =
    size === 'small' ? 'w-32' : size === 'medium' ? 'w-64' : 'w-96';
  return (
    <Card className={`p-4 ${sizeVal} w-`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mb-2">6 goals</p>
      <p className="italic">{description}</p>
    </Card>
  );
};
