import { useNavigate } from 'react-router-dom';
import { ModeToggle } from '../theme/mode-toggle';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';


export function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.token);
  
  return (
      <div className="flex flex-1 items-center justify-end space-x-2 px-4  ">
      { isLoggedIn 
        ? 
            <Button
                variant="outline"
                size="default"
                onClick={() => navigate("/admin/blogs") }
                className='cursor-pointer'
              >
                Admin
              </Button>
        :
          <Button
            variant="outline"
            size="default"
            onClick={() => navigate("/admin/login") }
            className='cursor-pointer'
          >
            Login
          </Button>}
        <ModeToggle />
      </div>
  )
}