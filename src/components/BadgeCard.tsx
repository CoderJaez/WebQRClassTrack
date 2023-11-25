import { Card, Text } from "@mantine/core";

type Props = {
  Title: string;
  Value: string;
  BgColor: string;
};

const BadgeCard: React.FC<Props> = ({ Title, Value, BgColor }) => {
  return (
    <Card shadow="sm" p="xs" radius="sm" withBorder bg={BgColor} h={150}>
      <Text size="xl" fw={900} c="whitesmoke">
        {Title}
      </Text>
      <Text style={{ fontSize: 50}} ta="right" c="whitesmoke" fw={800} pr="sm">
        {Value}
      </Text>
    </Card>
  );
};

export default BadgeCard;
