import { StyleSheet, View } from 'react-native';

import { useSession } from '@/providers/auth/SessionProvider';
import { UserInfoLabel } from '@/components/ui/public/department/dashboard';
import { horizontalScale } from '@/utils';
import LinkBoxesHolder from '@/components/ui/public/department/dashboard/LinkBoxesHolder';

const Dashboard = () => {
  const { session } = useSession();
  const sessionInfo = JSON.parse(session || "{}");
  console.log(sessionInfo);

  return (
    <View style={styles.container}>
      <UserInfoLabel />
      <LinkBoxesHolder />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(5)
  }
});