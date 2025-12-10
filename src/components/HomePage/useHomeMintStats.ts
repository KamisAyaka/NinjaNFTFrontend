import { useEffect, useState } from "react";
import { evmContractService } from "../../utils/evmContract";

export function useHomeMintStats() {
  const [totalMinted, setTotalMinted] = useState(0);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const total = await evmContractService.getTotalMinted();
        if (!mounted) return;
        setTotalMinted(total);
      } catch {
        if (!mounted) return;
        setTotalMinted(0);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return { totalMinted };
}

