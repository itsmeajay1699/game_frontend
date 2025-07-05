import { toast, type ExternalToast } from "sonner";

export const toastError = (message: string, option: ExternalToast | undefined) => {
    toast.error(message, {
        duration: 3000,
        style: {
            background: "#ff4747",
            color: "#fff",
            fontWeight: "bold",
        },
        richColors: true,
        ...option,
    });
};

export const toastSuccess = (message: string, option: ExternalToast | undefined) => {
    toast.success(message, {
        duration: 3000,
        richColors: true,
        style: {
            background: "#4FF55F",
            color: "#121212",
            fontWeight: "bold",
        },
        ...option,
    });
};
