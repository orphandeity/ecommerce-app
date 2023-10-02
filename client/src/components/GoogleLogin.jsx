import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithGoogle } from "../lib/auth";

function GoogleLogin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAuthenticated"] });
    },
  });

  return (
    <button
      disabled={isLoading}
      onClick={() => mutate()}
      style={{ width: "100%" }}
    >
      Log in with Google
    </button>
  );
}

export default GoogleLogin;
