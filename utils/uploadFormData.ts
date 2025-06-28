import URLs from "./URLs";
import { getImageInfo } from "./fileUtils";
import { SpringWaterSourceFormType }
  from "@/components/ui/public/department/dashboard/springs/SpringWaterSourceForm";

export interface DataToUpload extends SpringWaterSourceFormType {
  activityType: string,
  lati: string | undefined,
  longi: string | undefined;
  department: number;
  otherActivity?: string;
}

export const uploadFormToServer = async (formData: DataToUpload): Promise<boolean> => {
  const uploadData = new FormData();
  uploadData.append('block', formData.block);
  uploadData.append('district', formData.district);
  uploadData.append('sourceName', formData.sourceName);
  uploadData.append('activityType', formData.activityType);
  uploadData.append('activity', formData.activity as never);
  uploadData.append('mobileNumber', formData.mobileNumber);
  uploadData.append('gramPanchayat', formData.gramPanchayat);
  uploadData.append('lati', formData.lati?.toString() || '');
  uploadData.append('longi', formData.longi?.toString() || '');
  uploadData.append('revenueVillage', formData.revenueVillage);
  uploadData.append('otherActivity', formData.otherActivity || "");
  uploadData.append('otherdeptName', formData.otherdeptName || "");
  uploadData.append('department', formData.department.toString());

  const sourceImage1 = getImageInfo(formData.sourceImage1);
  const sourceImage2 = getImageInfo(formData.sourceImage2);
  uploadData.append('sourceImage1', sourceImage1 as any);
  uploadData.append('sourceImage2', sourceImage2 as any);

  try {
    const response = await fetch(`${URLs.baseUrl}/uploadFormDept.php`, {
      method: 'POST',
      body: uploadData,
    });
    
    if (!response.ok) return false;

    const data = await response.json();
    console.log('Response:', data);
    return data.status === 'success';
  } catch (e) {
    console.error('Upload Error:', e);
    return false;
  }
};