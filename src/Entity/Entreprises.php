<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\EntreprisesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=EntreprisesRepository::class)
 * @ApiResource(
 *   normalizationContext={
 *      "groups" = {"entreprises_read"}
 * },
 *   denormalizationContext={
 *        "disable_type_enforcement"=true
 *   }
 * )
 * @ApiFilter(SearchFilter::class)
 * @ApiFilter(OrderFilter::class)
 */
class Entreprises
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"entreprises_read", "bons_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"entreprises_read", "bons_read", "pdvs_read", "techniciens_read", "users_read", "comptes_read"})
     * @Assert\NotBlank(message="Le nom de l'entreprise est obligatoire !")
     * @Assert\Length(
     *      min = 3,
     *      max = 255,
     *      minMessage = "Le nom de l'entreprise doit faire entre 3 et 255 caractères !",
     *      maxMessage = "Le nom de l'entreprise doit faire entre 3 et 255 caractères !",
     *      allowEmptyString = false
     * )
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     * @Assert\NotBlank(message="La rue est obligatoire !")
     * @Assert\Length(
     *      min = 3,
     *      max = 255,
     *      minMessage = "La rue doit faire entre 3 et 255 caractères !",
     *      maxMessage = "La rue doit faire entre 3 et 255 caractères !",
     *      allowEmptyString = false
     * )
     */
    private $rue;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     * @Assert\Length(
     *      min = 4,
     *      max = 4,
     *      minMessage = "Le code postal doit contenir 4 chiffres au minimum",
     *      maxMessage = "Le code postal doit contenir 4 chiffres au maximum",
     *      allowEmptyString = false
     * )
     */
    private $npa;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     * @Assert\NotBlank(message="Le lieu est obligatoire !")
     * @Assert\Length(
     *      min = 3,
     *      max = 255,
     *      minMessage = "Le lieu doit faire entre 3 et 255 caractères !",
     *      maxMessage = "Le lieu doit faire entre 3 et 255 caractères !",
     *      allowEmptyString = false
     * )
     */
    private $lieu;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     */
    private $telephone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     */
    private $fax;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"entreprises_read", "bons_read"})
     * @Assert\Email(
     *     message = "La valeur saisie n'est pas un email valide !"
     * )
     */
    private $mail;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $supprimer;

    /**
     * @ORM\OneToMany(targetEntity=Bons::class, mappedBy="entreprise")
     * @Groups({"entreprises_read"})
     * @ApiSubresource
     */
    private $bons;

    /**
     * @ORM\ManyToOne(targetEntity=Departements::class, inversedBy="entreprises")
     * @Groups({"entreprises_read"})
     */
    private $departement;

    public function __construct()
    {
        $this->bons = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getRue(): ?string
    {
        return $this->rue;
    }

    public function setRue(?string $rue): self
    {
        $this->rue = $rue;

        return $this;
    }

    public function getNpa()
    {
        return $this->npa;
    }

    public function setNpa($npa): self
    {
        $this->npa = $npa;

        return $this;
    }

    public function getLieu(): ?string
    {
        return $this->lieu;
    }

    public function setLieu(?string $lieu): self
    {
        $this->lieu = $lieu;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getFax(): ?string
    {
        return $this->fax;
    }

    public function setFax(?string $fax): self
    {
        $this->fax = $fax;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(?string $mail): self
    {
        $this->mail = $mail;

        return $this;
    }

    public function getSupprimer(): ?bool
    {
        return $this->supprimer;
    }

    public function setSupprimer(?bool $supprimer): self
    {
        $this->supprimer = $supprimer;

        return $this;
    }

    /**
     * @return Collection|Bons[]
     */
    public function getBons(): Collection
    {
        return $this->bons;
    }

    public function addBon(Bons $bon): self
    {
        if (!$this->bons->contains($bon)) {
            $this->bons[] = $bon;
            $bon->setEntreprise($this);
        }

        return $this;
    }

    public function removeBon(Bons $bon): self
    {
        if ($this->bons->contains($bon)) {
            $this->bons->removeElement($bon);
            // set the owning side to null (unless already changed)
            if ($bon->getEntreprise() === $this) {
                $bon->setEntreprise(null);
            }
        }

        return $this;
    }

    public function getDepartement(): ?Departements
    {
        return $this->departement;
    }

    public function setDepartement(?Departements $departement): self
    {
        $this->departement = $departement;

        return $this;
    }
}
