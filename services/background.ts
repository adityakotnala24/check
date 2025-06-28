import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

import { isOnline } from '../utils/network';
import { uploadFormToServer } from '../utils/uploadFormData';
import { getPendingForms, deleteForm } from '../components/database/database';

const BACKGROUND_SYNC_TASK = 'BACKGROUND_SYNC_TASK';

TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
  const online = await isOnline();
  if (!online) return BackgroundFetch.BackgroundFetchResult.NoData;

  try {
    const forms = await getPendingForms();
    for (const form of forms as any) {
      const formData = JSON.parse(form.formData);
      const success = await uploadFormToServer(formData);
      if (success) await deleteForm(form.id);
    }
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (e) {
    console.error('Background sync error:', e);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export const registerBackgroundSync = async () => {
  await BackgroundFetch.registerTaskAsync(BACKGROUND_SYNC_TASK, {
    minimumInterval: 10 * 60,
    stopOnTerminate: false,
    startOnBoot: true,
  });
};
