import { useAuth } from '../context/AuthContext';
import { USER_ROLES } from '../utils/constants';

export const useRolePromotion = () => {
  const { user, promoteToPetOwnerRole } = useAuth();

  const promoteOnPetAdoption = async () => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    // Only promote if user is currently a Guest
    if (user.role === USER_ROLES.GUEST) {
      try {
        const result = await promoteToPetOwnerRole(user.id);
        return result;
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    
    return { success: true, message: 'User already has appropriate role' };
  };

  const promoteOnPetCreation = async () => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    // Only promote if user is currently a Guest
    if (user.role === USER_ROLES.GUEST) {
      try {
        const result = await promoteToPetOwnerRole(user.id);
        return result;
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    
    return { success: true, message: 'User already has appropriate role' };
  };

  return {
    promoteOnPetAdoption,
    promoteOnPetCreation,
    canBePromoted: user?.role === USER_ROLES.GUEST
  };
};
