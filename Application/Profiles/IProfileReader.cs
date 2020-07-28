using System.Threading.Tasks;

namespace Application.Profiles
{
  public interface IProfileReader
  {
    Task<Profile> ReadProfie(string username);
  }
}