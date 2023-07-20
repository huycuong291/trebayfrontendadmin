import { styles } from "@/utils/toasts";
import { UserProps } from "@/utils/types";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { api } from "../axios";

const valueSetting = "/valueSetting";
export const getAllValueSetting = async () => {
  return await api
    .get(valueSetting + "/all")
    .then((response) => {
      return { data: response.data, statusText: response.statusText };
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addValueSetting = async (valueSettingData: UserProps) => {
  return await api
    .post(valueSetting, {
      ...valueSettingData,
    })
    .then((response) => {
      showNotification({
        title: "Thành công!",
        message: "Tạo tài khoản thành công",
        styles: (theme) => styles("green", theme),
      });
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateValueSetting = async (valueSettingData: any) => {
  return await api
    .put(valueSetting + "/" + valueSettingData._id, {
      ...valueSettingData,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
