import URLs from "./URLs";
import { getImageInfo } from "./fileUtils";
import { SpringWaterSourceFormType }
  from "@/components/ui/public/department/dashboard/incident/SpringWaterSourceForm";

export interface DataToUpload  {
  lati: string;
  longi: string;
  incidentDate: string;
  incidentTime: string;
  affectedPersonName: string;
  affectedPersonAddress: string;
  beneficieryName: string;
  witnessName: string;
  witnessAddress: string;
  block: string;
  district: string;
  sourceImage1: string,
  sourceImage2: string;
  mobileNumber: string;
  beneficieryAddress: string;
}

export const uploadFormToServer = async (formData: DataToUpload): Promise<boolean> => {
  const uploadData = new FormData();
  uploadData.append('block', formData.block);
  uploadData.append('district', formData.district);
  uploadData.append('incidentDate', formData.incidentDate);
  uploadData.append('incidentTime', formData.incidentTime);
  uploadData.append('affectedPersonName', formData.affectedPersonName);
  uploadData.append('affectedPersonAddress', formData.affectedPersonAddress);
  uploadData.append('beneficieryName', formData.beneficieryName);
  uploadData.append('lati', formData.lati?.toString());
  uploadData.append('longi', formData.longi?.toString());
  uploadData.append('beneficieryName', formData.beneficieryName);
  uploadData.append('witnessName', formData.witnessName);
  uploadData.append('witnessAddress', formData.witnessAddress);
  uploadData.append('mobileNumber', formData.mobileNumber);
  uploadData.append('beneficieryAddress', formData.beneficieryAddress);

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