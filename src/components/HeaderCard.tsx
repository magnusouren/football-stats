import { Card } from './ui/card';

interface HeaderCardProps {
  title: string;
  size?: 'small' | 'medium' | 'large';
}

export const HeaderCard: React.FC<HeaderCardProps> = ({
  title,
  size = 'medium',
}) => {
  const sizeVal =
    size === 'small' ? 'w-32' : size === 'medium' ? 'w-64' : 'w-96';
  return (
    <Card className={`p-4 ${sizeVal} w-`}>
      <h2 className="text-xl font-semibold">{title}</h2>
    </Card>
  );
};
